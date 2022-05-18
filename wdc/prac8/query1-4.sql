SELECT customer.first_name,customer.last_name,MIN(rental.rental_date)
FROM rental
INNER JOIN customer
ON customer.customer_id = rental.customer_id
WHERE rental.return_date IS NULL;