def build_student_profile_text(user_input_array, major, student_description, predicted_level=None):
    inputs = user_input_array.flatten().tolist()
    profile_parts = []
    if predicted_level:
        profile_parts.append(
            f"{major}, {student_description}, **{predicted_level}** level."
        )
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
