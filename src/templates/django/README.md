
# Django Boilerplate

![image](https://res.cloudinary.com/gbrachetta/image/upload/v1607301400/oob_bfglzw.jpg)

This app is a starter with ready-to-go settings for a new Django app and it was bootstrapped by [Frames](https://github.com/GBrachetta/frames).

It assumes using AWS to store static files, and the production variables have been added accordingly (but they only load in case there's a `USE_AWS=True` variable in the environment).

It also assumes deploying in Heroku to make use of their database, but that can be easily changed to any other database set of variables in `your-app-name/settings/production.py`.

## How to get started

1. You're mostly good to go! Just activate your virtual environment and start the development server!

     ```bash
     pipenv shell
     python manage.py runserver
     ```

2. A superuser has been automatically created during the generation of this project:

     - Username: `admin`
     - Password: `admin`
     - Email: `admin@domain.com`

3. Your main project's name has been changed to **boilerplate**. You can change the name of it again by running

    `$ python manage.py rename boilerplate <new-project-name>`

    > **Don't rename your project once you've started adding apps. The rename script looks for specific template files only in order to rename them. Once you renamed your project and started developing, stick to that name!**

That's all. Happy coding!

## Notes

- The `.gitignore` file provided is ready to ignore all the commonly ignored files so if you create a local repository (`$ git init`) it will take care of ignoring sensitive information.

- The `.env` file provided (`your-app-name/settings/.env`) is the place to include your environment variables. Change `DJANGO_ENV` to either `development` or `production` for the corresponding settings to load (default is 'development').

- New settings go in the following files:

  - `your-app-name/settings/common.py` for settings common to both development and production
  - `your-app-name/settings/development.py` for settings used during development.
  - `your-app-name/settings/production.py` for settings used for production.

- If you're deploying to Heroku, make sure to add the following environment variables:

  - `DISABLE_COLLECTSTATIC=1` (Until you have setup your AWS S3 bucket)
  - `DJANGO_ENV=production`
  - `DOMAIN_NAME=<yourdomain.com>`
  - `AWS_ACCESS_KEY_ID=<your-AWS-public-key>`
  - `AWS_SECRET_ACCESS_KEY=<your-AWS-secret-key>`
  - `AWS_STORAGE_BUCKET_NAME=<your-S3-bucket-name>`

- The app includes a handy django toolbar (only available in the development environment) that facilitates debugging.

- The app also includes useful settings to develop a Django app on VS Code, and a `launch.json` file to run the server in debugging mode using the integrated debugger in VS Code. Feel free to delete these and the parent `.vscode` folder if you use some other editor.
