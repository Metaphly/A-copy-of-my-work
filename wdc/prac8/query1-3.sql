SELECT customer.first_name,customer.last_name,rental.rental_date
FROM rental
INNER JOIN customer
ON customer.customer_id = rental.customer_id
WHERE rental.return_date IS NULL
GROUP BY first_name,last_name,rental_date
HAVING rental_date=MIN(rental_date);