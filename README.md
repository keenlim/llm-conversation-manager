# llm-conversation-manager

This repository contains the source code for an MVP (Minimum Viable Product) application designed to facilitate the utilisation of Large Language Models (LLMs). The application comprises of two main components: 
1. **Backend**: A FastAPI-based backend that interacts with LLMs. 
2. **Frontend**: A Next.js-based frontend that presents LLM data to the users. 

### Features 
- **Backend**:
    - API endpoints to interact with LLMs. 
    - Handles the CRUD Functions of conversations whihc will contain a history of queries and responses from an LLM
    - Integrates with MongoDB for data persistence. 

- **Frontend**:
    - User interface to allow users to interact with LLMs.
    - Displays conversations and messages in real-time. 
    - Responsive design using Mantine UI. 

### 📌 Technical Stack
<h2> 🤖 FrontEnd </h2>
<img alt = "Javascript" src = "https://img.shields.io/badge/Javascript-F7DF1E?logo=javascript&logoColor=black&style=flat"/>

<img alt = "React" src = "https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=flat"/>

<img alt = "NextJS" src = "https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>

<img alt="MantineUI" src="https://img.shields.io/badge/Mantine%20UI-8A2BE2"/>

<img alt="ReactQuery" src="https://img.shields.io/badge/React%20Query%204-20B2AA"/>


<h2>🤖 BackEnd</h2>
<img alt = "Python" src = "https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=black&style=flat"/>

<img alt = "FastAPI" src = "https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi"/>

<img alt = "OpenAI" src = "https://img.shields.io/badge/chatGPT-74aa9c?logo=openai&logoColor=white"/>

<img alt = "LangChain" src = "https://img.shields.io/github/v/release/hwchase17/langchain.svg"/>

<h2>Prerequisites</h2>
Ensure you have the following installed on your local machine:

- [Git](https://git-scm.com/downloads)
- [Docker](https://docs.docker.com/get-docker/) (version 20.10.0 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 1.27.0 or higher)

## Set up and Installation
1. Clone the repository 
```
git clone https://github.com/keenlim/llm-conversation-manager.git
cd llm-conversation-manner
```

2. Configure Environment variables
</br>
Create a `.env` file in the backend folder to configure variables for the backend. Populate the `.env` file with the following variables:

```
OPENAI_API_KEY=<your_openai_api_key>
```
Note: Replace `<your_openai_api_key>` with the actual OpenAI API Key. 

3. To run the application:
- Build Docker Images
</br>

From the project's root directory, run:
```
docker-compose build
```

- Start Docker Containers
</br>

Run the following command to start all services defined in `docker-compose.yml`
```
docker-compose up
```

4. Access the Application
- Frontend: Open your browser and navigate to http://localhost:3000
- Backend: Access the FastAPI Swagger Documents on http://localhost:8000/docs
- MongoDB: MongoDB is accessible at `mongodb://localhost:27017`

5. To Stop the Application

To stop running the containers, press `Ctrl + C` in the terminal where `docker-compose down ` is running. 

## Future Improvements
1. Implement authentication and authorisation to enhance the security of our application using OAuth.
2. Enhance user interface and experience by incorporating responsive design principles to ensure optimal performance across devices. 
3. Ensure the application adheres to accessibility standards (e.g. WCAG guidelines).
4. Real-Time Features such as the usage of WebSockets to ensure real-time communication by using libraries such as Socket.io
5. Multi-Language Support to cater the application to a broader audiene

## Closing Thoughts
A simple application that aids in the utilisation of LLMs. By systematically addressing backend and frontend improvements, optimizing infrastructure, enhancing user experience, and embracing best engineering practices, there is a potential to significantly elevate the quality and utility of your LLM-powered application. 