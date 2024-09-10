import pandas as pd

# Load the dataset
df = pd.read_csv('megaGymDataset_with_calories.csv')
df = df[['id','Title', 'Desc', 'Type', 'BodyPart', 'Equipment', 'Level', 'Calories_Burned']]

# Function to search exercises by an array of IDs
def search_exercises_by_ids(exercise_ids):
    # Filter the DataFrame for matching IDs
    filtered_df = df[df['id'].isin(exercise_ids)]
    
    # Replace NaN values with None (which translates to null in JSON)
    filtered_df = filtered_df.where(pd.notnull(filtered_df), None)
    
    # Convert the filtered results to a dictionary
    exercises = filtered_df.to_dict(orient='records')
    
    return exercises
