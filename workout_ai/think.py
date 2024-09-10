import pandas as pd

# Load dataset (ensure this path is correct)
df = pd.read_csv('megaGymDataset_with_calories.csv')
df = df[['id','Title', 'Desc', 'Type', 'BodyPart', 'Equipment', 'Level', 'Calories_Burned']]

def get_exercise_recommendations(body_part, mood):
    # Filter exercises by the specified body part
    filtered_df = df[df['BodyPart'].str.lower() == body_part.lower()]

    # Define mood-based settings for intermediate and beginner exercises
    mood_settings = {
        'tired': {'beginner': 7, 'intermediate': 3},
        'energetic': {'beginner': 3, 'intermediate': 7},
        'normal': {'beginner': 5, 'intermediate': 5}
    }

    if mood not in mood_settings:
        return {"error": "Mood must be 'tired', 'energetic', or 'normal'"}, 400

    # Get settings for the specified mood
    settings = mood_settings[mood]

    # Separate exercises by level
    beginner_exercises = filtered_df[filtered_df['Level'].str.lower() == 'beginner']
    intermediate_exercises = filtered_df[filtered_df['Level'].str.lower() == 'intermediate']

    # Initialize recommendations
    recommendations = []

    # Add beginner exercises
    if not beginner_exercises.empty:
        beginner_sample = beginner_exercises.sample(n=min(len(beginner_exercises), settings['beginner']))
        recommendations.extend(beginner_sample.to_dict('records'))
    
    # Add intermediate exercises
    if not intermediate_exercises.empty:
        intermediate_sample = intermediate_exercises.sample(n=min(len(intermediate_exercises), settings['intermediate']))
        recommendations.extend(intermediate_sample.to_dict('records'))
    
    # Ensure we have a mix of levels
    while len(recommendations) < 10 and not filtered_df.empty:
        remaining_exercises = filtered_df[~filtered_df.index.isin([rec['index'] for rec in recommendations])]
        if not remaining_exercises.empty:
            additional_exercises = remaining_exercises.sample(n=10 - len(recommendations))
            recommendations.extend(additional_exercises.to_dict('records'))
    
    # Convert to DataFrame
    recommendations_df = pd.DataFrame(recommendations)
    
    # Replace NaN with None for JSON serialization
    recommendations_df = recommendations_df.where(pd.notnull(recommendations_df), None)
    
    return recommendations_df.to_dict(orient='records')
