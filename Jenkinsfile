pipeline {
    agent any
    tools {nodejs "NodeJS"} 
    environment {
        REPOSITORY_TAG="sdarwant/weather-radar-ui-app:${BUILD_ID}"
    }
    //For Angular UI app
    stages {
        stage('Build') {
            steps {
                echo "CURRENT BRANCH: $GIT_BRANCH"
                // dir("${env.WORKSPACE}/Project1-WeatherRadar/weather-radar-ui"){
                //     sh(script: """
                //     npm ci
                //     npm install -g @angular/cli@13.1.4 
                //     ng build
                //     """)
                // }
            }
        }
        stage('Test') {
            steps {
                echo 'TEST SKIPPED FOR NOW'
            }
        }
        stage ('Build Image'){
            when {
                expression { env.GIT_BRANCH  == 'origin/dev-ui-angular-phase3' }
            }
            steps {
                sh 'docker image build -t ${REPOSITORY_TAG} .'
            }
        }
    }
}