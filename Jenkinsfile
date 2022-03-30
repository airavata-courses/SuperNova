pipeline {
    agent any
  
    //For Weather Api app
    stages {
        stage('Build') {
            steps {
                echo "CURRENT BRANCH ${GIT_BRANCH}"
                dir("${env.WORKSPACE}/Project1-WeatherRadar/weather-api"){
                    sh(script: """
                    sed -i 's/weather-api-00/weather-api-dev-${BUILD_ID}/g' weatherApi.py
                    pip install -r requirements.txt
                    pip install arm-pyart
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
                expression { env.GIT_BRANCH  == 'origin/dev-ms-weather-api-phase3' }
            }
            steps {
                echo "BUILD DOCKER IMAGE"
                 dir("${env.WORKSPACE}/Project1-WeatherRadar/weather-api"){
                     sh 'docker image build -t sdarwant/weather-radar-api-app:dev .'
                     sh 'docker push sdarwant/weather-radar-api-app:dev'
                }
            }
        }
        stage ('Deploy to K8s'){
            when {
                expression { env.GIT_BRANCH  == 'origin/dev-ms-weather-api-phase3' }
            }
            steps {
                 echo "DEPLOY TO K8s"
                dir("${env.WORKSPACE}/Project1-WeatherRadar/weather-api"){
                    sh 'sudo microk8s kubectl -n space-dev apply -f weather-radar-api-app.deployment.yml'
                    sh 'sudo microk8s kubectl -n space-dev apply -f loadbalancer.service.yml'
                    sh 'sudo microk8s kubectl -n space-dev rollout restart deployment user-api-app'
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
