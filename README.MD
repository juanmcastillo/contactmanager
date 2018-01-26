# Contact Manager Test

This is a sample project to apply for a remote job position. It consist on a SPA application with an small REST Api. The main tools that I used for these were React, and .Net Core 2, respectively.

# HOW-TO:

## Run the REST Api:

1. Clone the repo into your local machine: git clone git@github.com:juanmcastillo/contactmanager.git
2. cd contactmanager
3. Start the REST API: dotnet run --project ./ContactManager/ContactManager.csproj

## Start the Client

From the root directory of the repository (after cloning):

1. cd ./ContactManager/contact_manager_client
2. Run: npm install
3. Run: npm start
4. A browser window should open, otherwise head to http://localhost:3000

## Notes:

* On the source code of the Rest API, make sure that you set the proper connection string your SQL Server on the appsettings.json file.

## Requirements:
* SQL Server Express Edition
* .NET Core 2.0
* Node.Js 8.9.1
* NPM 5.5.1


