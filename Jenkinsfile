//trial

node {
  stage('Clone repository') {
    checkout([
      $class: 'GitSCM',
      branches: [[name: 'master']],
      userRemoteConfigs: [[credentialsId: 'github', url: 'https://github.com/suraksha-niveus/ArgoCD-multiple-microservice-src.git']]
    ])  
  }

  // List of microservices
  def microservices = ['php01', 'node01']

  // Iterate through each microservice
  for (int i = 0; i < microservices.size(); i++) {
    def microservice = microservices[i]

    // Check for changes in the microservice directory
    def changes = scm.poll(["/path/to/${microservice}"], 1)

    // Only build and push image if there are changes in the microservice directory
    if (changes) {
      stage('Build image') {
        dir("${microservice}") {
          def app = docker.build("surakshaniveus/ms-${microservice}")
        }    
      }

      stage('Push image') {
        docker.withRegistry('https://registry.hub.docker.com', 'docker') {
          def app = docker.image("surakshaniveus/ms-${microservice}")
          app.push("${env.BUILD_NUMBER}")
        }
      }
    }
  }

  // Clone deployment repo
  stage('Clone deployment repository') {
    checkout([
      $class: 'GitSCM',
      branches: [[name: 'main']],
      userRemoteConfigs: [[credentialsId: 'github', url: 'https://github.com/suraksha-niveus/CICD-argoCD.git']]
    ])
  }

  // Update image tag in deployment repo
  stage('Update GIT') {
    script {
      catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
        withCredentials([usernamePassword(credentialsId: 'github', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
          sh "ls -la"
          sh "git config user.email suraksha.shetty@niveussolutions.com"
          sh "git config user.name suraksha-niveus"
          sh "pwd"
          sh "cat values-dev.yaml"
          sh "sed -i 's+tag.*+tag: ${BUILD_NUMBER}+g' values-dev.yaml"
          sh "cat values-dev.yaml"
          sh "git add ."
          sh "git commit -m 'Done by Jenkins Job changemanifest: ${env.BUILD_NUMBER}'"
          sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/suraksha-niveus/CICD-argoCD.git main"
        }
      }
    }
  }
}













// node {


    
//     stage('Clone repository') {
      
//       checkout([$class: 'GitSCM',
//             branches: [[name: 'master']],
//             userRemoteConfigs: [[credentialsId: 'github', url: 'https://github.com/suraksha-niveus/ArgoCD-multiple-microservice-src.git']]])  
      
//     }
    
    
//     // for php 
    
//     stage('Build image') {
//         dir('php01'){
//        app = docker.build("surakshaniveus/ms-php01")
//     }    
//     }
//      stage('Push image') {
        
//         docker.withRegistry('https://registry.hub.docker.com', 'docker') {
//             app.push("${env.BUILD_NUMBER}")
//         }
//     }
    
    
    
//     // for node

//     stage('Build image') {
//          dir('node01'){
//        app = docker.build("surakshaniveus/ms-node01")
//     }
//     }
//     stage('Push image') {
        
//         docker.withRegistry('https://registry.hub.docker.com', 'docker') {
//             app.push("${env.BUILD_NUMBER}")
//         }
//     }
    
    
//     stage('Clone repository') {
//         script{
        
//                    git branch: 'main', credentialsId: 'github', url: 'https://github.com/suraksha-niveus/CICD-argoCD.git'
//                 //  git credentialsId: 'github', url: 'https://github.com/suraksha-niveus/CICD-argoCD.git'
      
//         }
//     }

//     stage('Update GIT') {
//             script {
//                 catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
//                     withCredentials([usernamePassword(credentialsId: 'github', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                    
//                         sh "ls -la"
//                         sh "git config user.email suraksha.shetty@niveussolutions.com"
//                         sh "git config user.name suraksha-niveus"
//                         sh "pwd"
//                         sh "cat values-dev.yaml"
//                         sh "sed -i 's+tag.*+tag: ${BUILD_NUMBER}+g' values-dev.yaml"
//                         sh "cat values-dev.yaml"
//                         sh "git add ."
//                         sh "git commit -m 'Done by Jenkins Job changemanifest: ${env.BUILD_NUMBER}'"
                        
//                         sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/suraksha-niveus/CICD-argoCD.git main"
        
//                         // sh "git push --set-upstream origin main"
//                         // sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${GIT_USERNAME}/CICD-argoCD.git HEAD:main"
//       }
//     }
//   }
// }
// }




///new one for build at time

// node {


    
//     stage('Clone repository') {
      
//       checkout([$class: 'GitSCM',
//             branches: [[name: 'master']],
//             userRemoteConfigs: [[credentialsId: 'github', url: 'https://github.com/suraksha-niveus/ArgoCD-multiple-microservice-src.git']]])  
      
//     }
    
    
//     // for php 
    
//     stage('Build image') {
//         dir('php01'){
//        app = docker.build("surakshaniveus/ms-php01")
//     }    
//     }
//      stage('Push image') {
        
//         docker.withRegistry('https://registry.hub.docker.com', 'docker') {
//             app.push("${env.BUILD_NUMBER}")
//         }
//     }
    
    
    
//     // for node

//     stage('Build image') {
//          dir('node01'){
//        app = docker.build("surakshaniveus/ms-node01")
//     }
//     }
//     stage('Push image') {
        
//         docker.withRegistry('https://registry.hub.docker.com', 'docker') {
//             app.push("${env.BUILD_NUMBER}")
//         }
//     }
    
    
//     stage('Clone repository') {
//         script{
        
//                    git branch: 'main', credentialsId: 'github', url: 'https://github.com/suraksha-niveus/CICD-argoCD.git'
//                 //  git credentialsId: 'github', url: 'https://github.com/suraksha-niveus/CICD-argoCD.git'
      
//         }
//     }

//     stage('Update GIT') {
//             script {
//                 catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
//                     withCredentials([usernamePassword(credentialsId: 'github', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                    
//                         sh "ls -la"
//                         sh "git config user.email suraksha.shetty@niveussolutions.com"
//                         sh "git config user.name suraksha-niveus"
//                         sh "pwd"
//                         sh "cat values-dev.yaml"
//                         sh "sed -i 's+tag.*+tag: ${BUILD_NUMBER}+g' values-dev.yaml"
//                         sh "cat values-dev.yaml"
//                         sh "git add ."
//                         sh "git commit -m 'Done by Jenkins Job changemanifest: ${env.BUILD_NUMBER}'"
                        
//                         sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/suraksha-niveus/CICD-argoCD.git main"
        
//                         // sh "git push --set-upstream origin main"
//                         // sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${GIT_USERNAME}/CICD-argoCD.git HEAD:main"
//       }
//     }
//   }
// }
// }