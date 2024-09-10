import math

def calculate_recommendations(calories_burned, calories_consumed):
    try:
        # Calculate net calories
        net_calories = calories_consumed - calories_burned

        # Sigmoid function for gradual increase
        def sigmoid(x):
            return 1 / (1 + math.exp(-x / 200))

        # Recommendations based on net calories
        if net_calories > 0:
            # For positive net calories
            sleep_hours = round(7 + 3 * sigmoid(net_calories), 2)  # 7 to 10 hours
            water_intake = round(2.5 + math.log10(net_calories + 1), 2)  # 2.5 to 4+ liters
            meditation_minutes = round(10 + min(20, math.sqrt(net_calories / 300)), 2)  # 10 to 30 minutes
        else:
            # For negative net calories
            sleep_hours = round(6 + 2 * sigmoid(-net_calories), 2)  # 6 to 8 hours
            water_intake = round(1.5 + math.log10(-net_calories + 1), 2)  # 1.5 to 2.5+ liters
            meditation_minutes = round(5 + min(10, math.sqrt(-net_calories / 500)), 2)  # 5 to 15 minutes

        return {
            'recommended_sleep_hours': sleep_hours,
            'recommended_water_intake_liters': water_intake,
            'recommended_meditation_minutes': meditation_minutes
        }

    except Exception as e:
        return {'error': str(e)}
