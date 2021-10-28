--Script for Cities
CREATE TABLE Cities (
CityID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
CityName varchar(40) NOT NULL,
Region varchar(20) NOT NULL
)
GO

INSERT INTO Cities (CityName, Region)
       VALUES ('Auckland', 'Auckland'),
			  ('Christchurch', 'Canterbury'),
			  ('Dunedin', '	Otago'),
			  ('Hamilton', 'Waikato Region'),
	          ('Wellington', 'Wellington');
GO

--Script for Libraries
CREATE TABLE Libraries (
LibraryID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
LibraryName varchar(40) NOT NULL,
Category varchar(20) NOT NULL,
City varchar(40) NOT NULL,
Symbol varchar(6)
)
GO

INSERT INTO Libraries (LibraryName, Category, City, Symbol)
       VALUES ('Canterbury Medical Library','Health','Christchurch','-'),
			  ('Environmental Protection Authority','Government','Wellington','WRMA'),
			  ('Holy Trinity Cathedral','Music Hire','Auckland','AHTC'),
			  ('New Zealand Law Society Library','Law','Dunedin','-'),
	          ('Te Wananga o Aotearoa','Tertiary','Hamilton','HTWA');
GO