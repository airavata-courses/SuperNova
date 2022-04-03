pipeline {
    agent any
  
    //For Merra Api app
    stages {
        stage('Build') {
            steps {
                echo "CURRENT BRANCH ${GIT_BRANCH}"
                dir("${env.WORKSPACE}/Project1-WeatherRadar/merra-api"){
                    sh(script: """
                    sed -i 's/merra-api-00/merra-api-dev-${BUILD_ID}/g' merraApi.py
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
                expression { env.GIT_BRANCH  == 'origin/dev-ms-merra-api-phase3' }
            }
            steps {
                echo "BUILD DOCKER IMAGE"
                 dir("${env.WORKSPACE}/Project1-WeatherRadar/merra-api"){
                     sh 'docker image build -t sdarwant/merra-api-app:dev .'
                     sh 'docker push sdarwant/weather-radar-api-app:dev'
                }
            }
        }
        stage ('Deploy to K8s'){
            when {
                expression { env.GIT_BRANCH  == 'origin/dev-ms-merra-api-phase3' }
            }
            steps {
                 echo "DEPLOY TO K8s"
                dir("${env.WORKSPACE}/Project1-WeatherRadar/merra-api"){
                    sh 'sudo microk8s kubectl -n space-dev apply -f merra-api-app.deployment.yml'
                    sh 'sudo microk8s kubectl -n space-dev apply -f loadbalancer.service.yml'
                    sh 'sudo microk8s kubectl -n space-dev rollout restart deployment merra-api-app'
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
