SELECT Studnets.given_name, Students.family_name
FROM Students
INNER JOIN Enrolments
ON Students.student_id = Enrolments.student_id
WHERE Enrolments.subject_code='COMP SCI 2207';