-- For part one of this assignment you are to make a database with the following specifications and run the following queries
-- The drop table queries below are to facilitate testing on my end

DROP TABLE IF EXISTS `os_support`;
DROP TABLE IF EXISTS `device`;
DROP TABLE IF EXISTS `operating_system`;
DROP TABLE IF EXISTS `category_tbl`;


-- Create a table called category_tbl with the following properties:
-- id - an auto incrementing integer which is the primary key
-- name - a varchar with a maximum length of 255 characters, cannot be null
-- subcategory - a varchar with a maximum length of 255 characters, cannot be null
-- the combinatino of a name and subcategory must be unique

-- Category_tbl creation query replaces this text


-- Create a table called operating_system with the following properties:
-- id - an auto incrementing integer which is the primary key
-- name - a varchar of maximum length 255, cannot be null
-- version - a varchar of maximum length 255, cannot be null
-- name version combinations must be unique

-- Operating system table creation query replaces this text


-- Create a table called device with the following properties:
-- id - an auto incrementing integer which is the primary key
-- cid - an integer which is a foreign key reference to the category_tbl table
-- name - a varchar of maximum length 255 which cannot be null
-- received - a date type (you can read about it here http://dev.mysql.com/doc/refman/5.0/en/datetime.html)
-- isbroken - a boolean

-- The device table creation query replaces this text


-- Create a table called os_support with the following properties, this is a table representing a many-to-many relationship
-- between devices and operating systems:
-- did - an integer which is a foreign key reference to device
-- osid - an integer which is a foreign key reference to operating_system
-- notes - a text type
-- The primary key is a combination of did and osid

-- The os_support table creation query replaces this text


-- insert the following into the category_tbl table:

-- name: phone
-- subcategory: maybe a tablet?

-- name: tablet
-- subcategory: but kind of a laptop

-- name: tablet
-- subcategory: ereader



-- insert the folowing into the operating_system table:
-- name: Android
-- version: 1.0

-- name: Android
-- version: 2.0

-- name: iOS
-- version: 4.0



-- insert the following devices instances into the device table (you should use a subquery to set up foriegn keys referecnes, no hard coded numbers):
-- cid - reference to name: phone subcategory: maybe a tablet?
-- name - Samsung Atlas
-- received - 1/2/1970
-- isbroken - True

-- cid - reference to name: tablet subcategory: but kind of a laptop
-- name - Nokia
-- received - 5/6/1999
-- isbroken - False

-- cid - reference to name: tablet subcategory: ereader
-- name - jPad
-- received - 11/18/2005
-- isbroken - False


-- insert the following into the os_support table using subqueries to look up data as needed:
-- device: Samsung Atlas
-- os: Android 1.0
-- notes: Works poorly

-- device: Samsung Atlas
-- os: Android 2.0
-- notes: NULL

-- device: jPad
-- os: iOS 4.0
-- notes: NULL



