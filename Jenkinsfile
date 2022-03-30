pipeline {
    agent any
    tools {nodejs "NodeJS"} 

    //For Gateway App
    stages {
        stage('Build') {
            steps {
                echo "CURRENT BRANCH ${GIT_BRANCH}"
                dir("${env.WORKSPACE}/Project1-WeatherRadar/weather-radar-gateway"){
                    sh(script: """
                    sed -i 's/gateway-00/gateway-dev-${BUILD_ID}/' routes/index.js
                    npm ci
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
                expression { env.GIT_BRANCH  == 'origin/dev-gateway-api-phase3' }
            }
            steps {
                echo "BUILD DOCKER IMAGE"
                 dir("${env.WORKSPACE}/Project1-WeatherRadar/weather-radar-gateway"){
                     sh 'docker image build -t sdarwant/weather-radar-gateway-app:dev .'
                     sh 'docker push sdarwant/weather-radar-gateway-app:dev'
                }
            }
        }
        stage ('Deploy to K8s'){
            when {
                expression { env.GIT_BRANCH  == 'origin/dev-gateway-api-phase3' }
            }
            steps {
                 echo "DEPLOY TO K8s"
                dir("${env.WORKSPACE}/Project1-WeatherRadar/weather-radar-gateway"){
                    sh 'sudo microk8s kubectl -n space-dev apply -f weather-radar-gateway-app.deployment.yml'
                    sh 'sudo microk8s kubectl -n space-dev apply -f weather-radar-gateway-loadbalancer.service.yml'
                    sh 'sudo microk8s kubectl -n space-dev rollout restart weather-radar-gateway-app'
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
