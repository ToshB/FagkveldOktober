IF NOT EXISTS (SELECT * FROM BOOK)
BEGIN

	INSERT INTO Book (BookKey, Price) VALUES(1, 10000)
	INSERT INTO Book (BookKey, Price) VALUES(2, 15000)
	INSERT INTO Book (BookKey, Price) VALUES(3, 13300)

END


IF NOT EXISTS (SELECT * FROM CustomerSales)
BEGIN
	INSERT INTO CustomerSales (CustomerKey) VALUES(1)
END