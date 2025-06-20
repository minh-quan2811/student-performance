

def build_student_profile_text(user_input_array, major, student_description, predicted_level=None):
    inputs = user_input_array.flatten().tolist()

    profile_parts = []

    study_hours_map = {
        1: "does not study weekly",
        2: "studies less than 5 hours per week",
        3: "studies 6 to 10 hours per week",
        4: "studies 11 to 20 hours per week",
        5: "studies more than 20 hours per week"
    }

    frequency_map = {
        1: "never",
        2: "sometimes",
        3: "often"
    }

    attendance_map = {
        1: "always",
        2: "sometimes",
        3: "never"
    }

    gpa_scale_to_text = {
        1: "below 2.00",
        2: "between 2.00 and 2.49",
        3: "between 2.50 and 2.99",
        4: "between 3.00 and 3.49",
        5: "above 3.49"
    }
    if predicted_level:
        profile_parts.append(f"{major}, {student_description}, **{predicted_level}** level.")


    return " ".join(profile_parts)


def gpa_to_scale(gpa):
    gpa = float(gpa)
    if gpa < 2.00:
        return 1
    elif gpa < 2.50:
        return 2
    elif gpa < 3.00:
        return 3
    elif gpa < 3.50:
        return 4
    else:
        return 5