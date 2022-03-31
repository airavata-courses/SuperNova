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
                    sed -i 's/WeatherRadarUi-00/WeatherRadarUi-${BUILD_ID}/' src/index.html
                    npm ci
                    npm install -g @angular/cli@13.1.4 
                    ng build
                    """)
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Running Test Cases'
                dir("${env.WORKSPACE}/Project1-WeatherRadar/weather-radar-ui"){
                    sh 'npm test'
                }
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
                 echo "DEPLOY TO K8s"
                dir("${env.WORKSPACE}/Project1-WeatherRadar/weather-radar-ui"){
                    sh 'sudo microk8s kubectl -n space-dev apply -f weather-radar-ui-app.deployment.yml'
                    sh 'sudo microk8s kubectl -n space-dev apply -f loadbalancer.service.yml'
                    sh 'sudo microk8s kubectl -n space-dev rollout restart deployment weather-radar-ui-app'
                }
            }
        }
    }
    post {
        always {
            echo 'I will always say Hello again!'
            
            emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
            
        }
    }
}
