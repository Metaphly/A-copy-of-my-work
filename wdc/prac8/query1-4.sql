SELECT rental.rental_date
FROM customer
INNER JOIN rental
WHERE rental.return_date IS NULL;