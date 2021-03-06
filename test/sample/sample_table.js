exports.TABLE_FIELDS = ['Field', 'Type', 'Null', 'Key', 'Default', 'Extra']
exports.TABLE_NAMES = [
  {'Tables_in_simple': 'simple_table'}
]
exports.TABLE_ROWS = [
  { 'Field': 'id', 'Type': 'int(11)unsigned', 'Null': 'NO', 'Key': 'PRI', 'Default': 'NULL', 'Extra': 'auto_increment' },
  { 'Field': 'type', 'Type': 'int(11)', 'Null': 'YES', 'Key': '', 'Default': 'NULL', 'Extra': '' },
  { 'Field': 'name', 'Type': 'varchar(32)', 'Null': 'YES', 'Key': '', 'Default': 'NULL', 'Extra': '' },
  { 'Field': 'price', 'Type': 'decimal(11, 2)', 'Null': 'YES', 'Key': '', 'Default': false, 'Extra': '' },
  { 'Field': 'cost', 'Type': 'decimal(11, 2)', 'Null': 'YES', 'Key': '', 'Default': 'NULL', 'Extra': '' },
  { 'Field': 'time_start', 'Type': 'datetime', 'Null': 'NO', 'Key': '', 'Default': 'NULL', 'Extra': '' }
]
