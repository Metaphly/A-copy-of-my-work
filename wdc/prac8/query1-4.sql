SELECT rental.rental_date
FROM rental
INNER JOIN customer
ON customer
WHERE rental.return_date IS NULL;