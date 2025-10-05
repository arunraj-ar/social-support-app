# Social Support Application

This application uses ReactJS + Vite to implement a form so citizen can submit their details and financial and family situations to get support from the government. It uses chat gpt api integration to help users write in English and Arabic language. 
For styling Tailwind is used.
Icons are svg from Google Fonts Material Icons.

## How to setup ChatGPT API key

1. You need to have an api key
2. Once you have your repo in your machine, create a .env file similar to .env.example
3. Add the open-ai api key to this variable properly OPENAI_API_KEY
4. You can change api endpoint url if needed.

## How to run

1. Clone the repo.
2. Prefer using latest node version
3. Run npm install
4. Once npm install is completed, check the .env file and ensure open-ai api key is set
5. open-ai model can be changed if needed
6. The variable PORT is used to run the server that handles the api request from frontend and calls open-ai with the provided prompts.
7. Change the port if required.
8. UI will be running on default vite port - 5173
9. To start the app in dev mode execute "npm run dev"
10. Server and UI will be started parallelly, visit the localhost url provided in the terminal, by default it should be http://localhost:5173/

## Note

1. Translation is properly mapped on home page, Personal Information page, Help Me Write Modal, success page, and the header component only.
2. RTL works for whole UI upon Arabic language selection.
3. The form uses theme to have light and dark themes, and easier customizations. Dark or light theme selection happens based on device settings.


## Pending and Improvements to be done

1. Complete translations file and map all the texts in the Form properly.
2. Add country based phone number validations.
3. Use dropdowns for City, State, and Country inputs.
4. Prevent passing any user data to open-ai api, promt to use placeholders for name, and other details. Replace the placeholders in the frontend once chatgpt response is received.
5. Add animated loaders, and shimmers.
