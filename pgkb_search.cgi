#!/usr/local/bin/python3

#Connect to custom MySQL database composed of data from PharmGKB 
#MySQL Connector for accessing database
#Author: Brent Key

import cgi, json
import os
import mysql.connector

def main():
    print("Content-Type: application/json\n\n")
    form = cgi.FieldStorage()
    term = form.getvalue('search_term')
        
    conn = mysql.connector.connect(user='', password='', host='', database='') #add credentials for database access
    cursor = conn.cursor()
    
    #SQL query to search for user input across multiple columns/tables
    qry = """
          SELECT dg.name, dg.generic_names, dg.trade_names, rd.rsid, dl.name, dl.testing_level, gn.chromosome, gn.name, gn.symbol
          FROM drugs dg
          JOIN drug_labels dl ON dg.druglabel_id = dl.druglabel_id
          JOIN genes gn ON dl.druglabel_id = gn.druglabel_id
          JOIN rsid rd ON gn.pharmgkb_gene_id = rd.gene_id
          WHERE dg.name LIKE %s OR dg.generic_names LIKE %s OR gn.name LIKE %s OR gn.symbol LIKE %s OR dl.name LIKE %s 
    """
    
    #execute query for search term
    cursor.execute(qry, ('%' + term + '%', ))

    #return potential matches
    results = { 'match_count': 0, 'matches': list() }
    for (dg.name, dg.generic_names, dg.trade_names, dg.type, rd.rsid, rd.gene_id, dl.name, dl.testing_level, gn.chromosome, gn.name, gn.symbol) in cursor:
        results['matches'].append({'drug_name': dg.name, 'generic_name': dg.generic_names, 'trade_name': dg.trade_names, 'ref_snp': rd.rsid, 'drug_approval': dl.name, 'testing': dl.testing_level, 'chrom': gn.chromosome, 'gene_name': gn.name, 'gene_symbol': gn.symbol})
        results['match_count'] += 1

    conn.close()
    
    #JS file uses JSON data to display results
    print(json.dumps(results))


if __name__ == '__main__':
    main()
