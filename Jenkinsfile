pipeline {
    agent any

    environment {
        IMAGE_NAME = "jenkins-cicd-api"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Verify Docker') {
            steps {
                sh 'docker version'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                docker run --rm \
                --volumes-from jenkins \
                -w /var/jenkins_home/workspace/jenkins-cicd-api \
                node:20 \
                npm ci
                '''
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh '''
                docker run --rm \
                --volumes-from jenkins \
                -w /var/jenkins_home/workspace/jenkins-cicd-api \
                node:20 \
                npm test
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build \
                -t ${IMAGE_NAME}:${IMAGE_TAG} .
                '''
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker rm -f jenkins-api-test || true

                docker run -d \
                    --name jenkins-api-test \
                    -p 3001:3000 \
                    ${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                sleep 10
                curl --fail http://host.docker.internal:3001/health
                '''
            }
        }

    }

    post {
        always{
            sh '''
            docker rm -f jenkins-api-test || true
            '''

            echo 'Pipeline Finished'
        }

        success {
            echo 'CI/CD Pipeline executed successfully!'
        }

        failure {
            echo 'Pipeline execution failed.'
        }
    }
}