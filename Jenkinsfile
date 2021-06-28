library 'moonshine'
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t reptile-web-api ./web-api'
                sh 'docker build -t reptile-crawler ./crawler'
            }
        }
        stage('Deploy') {
            steps {
                serverUpdate('reptile')
            }
        }
    }
}