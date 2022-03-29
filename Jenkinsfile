pipeline {
    agent any
    tools {nodejs "NodeJS"} 

    //For Angular UI app
    stages {
        stage('Build') {
            steps {
                echo "CURRENT BRANCH ${GIT_BRANCH}"
                dir("${env.WORKSPACE}/Project1-WeatherRadar/weather-radar-ui"){
                    sh(script: """
                    npm ci
                    npm install -g @angular/cli@13.1.4 
                    ng build
                    """)
                }
            }
        }
        stage('Test') {
            steps {
                echo 'TEST SKIPPED FOR NOW'
            }
        }
        stage ('Build & Push Docker Image'){
            when {
                expression { env.GIT_BRANCH  == 'origin/dev-ui-angular-phase3' }
            }
            steps {
                echo "BUILD DOCKER IMAGE"
                 dir("${env.WORKSPACE}/Project1-WeatherRadar/weather-radar-ui"){
                     sh 'docker image build -t sdarwant/weather-radar-ui-app:dev .'
                     sh 'docker push sdarwant/weather-radar-ui-app:dev'
                }
            }
        }
        stage ('Deploy to K8s'){
            when {
                expression { env.GIT_BRANCH  == 'origin/dev-ui-angular-phase3' }
            }
            steps {
                dir("${env.WORKSPACE}/Project1-WeatherRadar/weather-radar-ui"){
                    sh 'sudo microk8s kubectl apply -f weather-radar-ui-app.deployment.yml'
                    sh 'sudo microk8s kubectl apply -f loadbalancer.service.yml'
                }
            }
        }
    }
}