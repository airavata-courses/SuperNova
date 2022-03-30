pipeline {
    agent any
    tools {nodejs "NodeJS"} 

    //For Weather Cache app
    stages {
        stage('Build') {
            steps {
                echo "CURRENT BRANCH ${GIT_BRANCH}"
                dir("${env.WORKSPACE}/Project1-WeatherRadar/weather-cache"){
                    sh(script: """
                    sed -i 's/weather-cache-00/weather-cache-dev-${BUILD_ID}/' index.js
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
                expression { env.GIT_BRANCH  == 'origin/dev-ms-weather-cache-phase3' }
            }
            steps {
                echo "BUILD DOCKER IMAGE"
                 dir("${env.WORKSPACE}/Project1-WeatherRadar/weather-cache"){
                     sh 'docker image build -t sdarwant/weather-cache-app:dev .'
                     sh 'docker push sdarwant/weather-cache-app:dev'
                }
            }
        }
        stage ('Deploy to K8s'){
            when {
                expression { env.GIT_BRANCH  == 'origin/dev-ms-weather-cache-phase3' }
            }
            steps {
                 echo "DEPLOY TO K8s"
                dir("${env.WORKSPACE}/Project1-WeatherRadar/weather-cache"){
                    sh 'sudo microk8s kubectl -n space-dev apply -f weather-cache-redis.yml'
                    sh 'sudo microk8s kubectl -n space-dev apply -f redis.clusterIP.service.yml'
                    echo 'Redis Configured'
                    sh 'sudo microk8s kubectl -n space-dev apply -f weather-cache-app.deployment.yml'
                    sh 'sudo microk8s kubectl -n space-dev apply -f loadbalancer.service.yml'
                    sh 'sudo microk8s kubectl -n space-dev rollout restart deployment weather-cache-app'
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
