pipeline {
    agent any

    //For Angular UI app
    stages {
        stage('Build') {
            when {
                branch 'feature-ui-*'
            }
            steps {
                dir("${env.WORKSPACE}/Project1-WeatherRadar/weather-radar-ui"){
                    sh(script: """
                    npm ci
                    npm install -g @angular/cli@13.1.4 
                    ng build
                    """)
                }
            }
        }
    }
}