from flask import Flask, request, jsonify
from flask_cors import CORS
from think import get_exercise_recommendations
from recommendation import calculate_recommendations
from main import search_exercises_by_ids

app = Flask(__name__)
CORS(app)

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    try:
        # Parse input data
        data = request.json
        calories_burned = data.get('calories_burned')
        calories_consumed = data.get('calories_consumed')
        

        # Validate input data
        if calories_burned is None or calories_consumed is None :
            return jsonify({'error': 'Missing required parameters'}), 400

        # Call the logic function to calculate recommendations
        recommendations = calculate_recommendations(calories_burned, calories_consumed)
        
        return jsonify(recommendations)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/workout-recommendations', methods=['GET'])
def workout_recommendations():
    try:
        # Get query parameters
        body_part = request.args.get('body_part')
        mood = request.args.get('mood')

        if not body_part or not mood:
            return jsonify({"error": "Missing required parameters: body_part and mood"}), 400

        # Call the logic function to get exercise recommendations
        recommendations = get_exercise_recommendations(body_part, mood)
        
        return jsonify(recommendations)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/get-exercises', methods=['POST'])
def get_exercises():
    # Get the array of exercise IDs from the POST request
    data = request.json
    exercise_ids = data.get('ids', [])

    # Call the function to search exercises by IDs
    exercises = search_exercises_by_ids(exercise_ids)

    return jsonify(exercises), 200

if __name__ == '__main__':
    app.run(port=4000)
