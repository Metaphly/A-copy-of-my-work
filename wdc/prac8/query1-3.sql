SELECT customer.first_name,customer.last_name,rental.rental_date
FROM rental
INNER JOIN customer
ON customer.customer_id = rental.customer_id
GROUP BY customer.first_name,customer.last_name;
WHERE rental.return_date IS NULL;