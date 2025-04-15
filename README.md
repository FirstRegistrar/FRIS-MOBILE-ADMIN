# FRIS Mobile Admin

## Overview
The **FRIS Mobile Admin** is a web-based administrative backend designed for managing users, roles, permissions, and shareholder data associated with the FRIS Mobile application developed for First Registrars and Investor Services Limited. The dashboard is tailored specifically for administrative staff to manage and monitor application activities efficiently.

## Features

- **User Management**: Create, update, and delete admin users.
- **Role & Permissions Management**: Assign roles and permissions to control access to different sections of the application.
- **Shareholder Management**: View detailed shareholder information retrieved securely from the database.
- **Search & Filtering**: Robust search capability with filters for efficient data management.
- **Activity Logging**: Comprehensive tracking of user activities for audit purposes.
- **Secure Authentication**: Role-based authentication ensuring secure access.

## Technology Stack

- **Backend**: CodeIgniter 4
- **Frontend**: HTML5, CSS3 (Bootstrap 5), JavaScript
- **Database**: MySQL, Microsoft SQL Server (MSSQL)

## Installation 
 
### Prerequisites
- PHP 7.4 or higher
- MySQL 5.7 or higher
- MSSQL Database connection

### Steps
1. Clone the repository:
```bash
git clone https://github.com/FirstRegistrar/FRIS-MOBILE-ADMIN.git
```

2. Navigate to the project directory:
```bash
cd FRIS-MOBILE-ADMIN
```

3. Install dependencies using Composer:
```bash
composer install
```

4. Set up your environment variables by creating a `.env` file from the provided `.env.example` and update it with your database credentials:

```env
app_baseURL = 'http://localhost'

# MySQL Database

 database.default.hostname = localhost
 database.default.database = frissadmin
 database.default.username = root
 database.default.password =
 database.default.DBDriver = MySQLi
 database.default.port = 3306

# MSSQL Database

 database.mssql.hostname = 104.211.8.144
 database.mssql.database = Estock
 database.mssql.username = fris_mobile
 database.mssql.password = your_password
 database.mssql.DBDriver = sqlsrv
 database.mssql.port = 1433
```

5. Run the development server:
```bash
php spark serve
```

6. Open your web browser and access the admin dashboard at:
```
http://localhost
```

## Usage
Log in with the admin credentials created directly in your MySQL database. From there, you can manage users, permissions, and shareholders' data.

## Contributing
Contributions and feature requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Support
If you need assistance, please contact the development team at Inspirive Technologies.

