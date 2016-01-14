# PharmGKB_SearchableDatabase
Selected data from PharmGKB (https://www.pharmgkb.org/) was downloaded and input into a SQL database. HTML, CSS, CGI, and JS scripts function to display the database in a searchable format for the web browser.  

*About*

This projects aim is to make the data from PharmGKB (https://www.pharmgkb.org/) and import it into a database to make it more easily searchable.  PharmGKB is a group focused on pharmacogenomics, managed by Stanford University, and supported by the NIH.  The datasets were previously disparate and only downloadable and searchable on a one-off basis. Database no longer accessible as of 12/2015.



* Preprocessing *

To encourage searchability, the tsv files were downloaded from PharmGKB website and cleaned up.  Several foreign keys were added across the datasets, linking particular columns where data was overlapping. Some datasets already had natural foreign keys, which did not require alteration. The data was loaded into a custom MySQL database on a private server. 


* Files from PharmGKB website used for database *

drugs.tsv
diseases.tsv
rsid.tsv
pathways.tsv



*  Files for database searching are also included. Scripts were developed to easily link important gene and drug information across the datasets. *

search_pgkb.cgi
search_pgkb.html
search_pgkb.js
search_pgkb.css



* Usage *

The scripting files can be implemented to search the datasets within a browser.  The scripts are setup to run against a database called “pharmgkb” within my specific domain “bkey2”, though changing this information will easily allow use on another server.

The scripts specifically target pertinent gene and drug information and how they relate to each other. Users may search within the data using a gene name, gene symbol, or drug name. If matches are found, the following information will be returned if it is available: generic and trade drug names, government drug approval, testing requirements for drug use, gene name, gene chromosome, gene symbol, and reference SNPs for the gene.

This data will allow one to more easily uncover relationships between genes, SNPs, and drugs that act against a specific gene (product). 
