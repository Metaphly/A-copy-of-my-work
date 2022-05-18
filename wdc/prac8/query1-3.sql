SELECT customer.first_name,customer.last_name,rental.rental_date
FROM rental
INNER JOIN customer
ON customer.customer_id = rental.customer_id
WHERE rental.rental_date = (SELECT min(rental_date) from rental WHERE return_date is Null) ;