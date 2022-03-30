pipeline {
    agent any
    //For User Api app
    stages {
        stage('Build') {
            steps {
                echo "CURRENT BRANCH ${GIT_BRANCH}"
                dir("${env.WORKSPACE}/Project1-WeatherRadar/user-Api"){
                    sh(script: """
                    sed 's/userapi-00/userapi-dev-${BUILD_ID}/g' src/main/resources/application.properties
                    mvn clean package -DskipTests
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
                expression { env.GIT_BRANCH  == 'origin/dev-ms-user-api-phase3' }
            }
            steps {
                echo "BUILD DOCKER IMAGE"
                 dir("${env.WORKSPACE}/Project1-WeatherRadar/weather-radar-ui"){
                     sh 'docker image build -t sdarwant/user-api-app:dev .'
                     sh 'docker push sdarwant/user-api-app:dev'
                }
            }
        }
        stage ('Deploy to K8s'){
            when {
                expression { env.GIT_BRANCH  == 'origin/dev-ms-user-api-phase3' }
            }
            steps {
                 echo "DEPLOY TO K8s"
                dir("${env.WORKSPACE}/Project1-WeatherRadar/weather-radar-ui"){
                    sh 'sudo microk8s kubectl -n space-dev apply -f user-api-app.deployment.yml'
                    sh 'sudo microk8s kubectl -n space-dev apply -f user-api-app.clusterIP.service.yml'
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