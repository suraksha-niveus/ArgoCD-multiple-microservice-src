

node {
    def app

    
    stage('Clone repository') {
      checkout scm
    }
    
    
    
    // for php
    
    stage('Build image') {
        dir('php01'){
       app = docker.build("surakshaniveus/ms-php01")
    }    
    }
     stage('Push image') {
        
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            app.push("${env.BUILD_NUMBER}")
        }
    }
    
    
    // for python

    stage('Build image') {
         dir('python01'){
       app = docker.build("surakshaniveus/ms-python01")
    }
    }
    
     stage('Push image') {
        
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            app.push("${env.BUILD_NUMBER}")
        }
    }
    
    
    
    // for node

    stage('Build image') {
         dir('node01'){
       app = docker.build("surakshaniveus/ms-node01")
    }
    }
    stage('Push image') {
        
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            app.push("${env.BUILD_NUMBER}")
        }
    }
    
    
  
  
    
    stage('Clone repository') {
        script{
        
                 git credentialsId: 'github', url: 'https://github.com/suraksha-niveus/mutiple-service-chart.git'
      
        }
    }

    stage('Update GIT') {
            script {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    withCredentials([usernamePassword(credentialsId: 'github', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                    
                        sh "git config user.email suraksha.shetty@niveussolutions.com"
                        sh "git config user.name suraksha-niveus"
                        sh "cat MS/values.yaml"
                        sh "sed -i 's+tag.*+tag: ${BUILD_NUMBER}+g' MS/values.yaml"
                        sh "cat MS/values.yaml"
                        sh "git add ."
                        sh "git commit -m 'Done by Jenkins Job changemanifest: ${env.BUILD_NUMBER}'"
                        sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${GIT_USERNAME}/mutiple-service-chart.git HEAD:master"
      }
    }
  }
}
}
