pipeline {
        agent any
        stages {
            stage('Clone repository') {
                steps {
                    git branch: 'master', credentialsId: 'github', url: 'https://github.com/suraksha-niveus/ArgoCD-multiple-microservice-src.git'
                }
            }
            
            stage('Build and push images') {
                steps {
                    script{
                        // List of microservices
                        def microservices = ['php01', 'node01']
    
                        // Iterate through each microservice
                        for (int i = 0; i < microservices.size(); i++) {
                            def microservice = microservices[i]
    
                            // Check for changes in the microservice directory
                            def changes = scm.poll("ArgoCD-multiple-microservice-src/${microservice}", 1)

    
                            // Only build and push image if there are changes in the microservice directory
                            if (changes) {
                                stage("Build and push ${microservice} image") {
                                    steps {
                                        dir("${microservice}") {
                                            sh "docker build -t surakshaniveus/ms-${microservice}:${env.BUILD_NUMBER} ."
                                        }
                                        withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                                            sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                                            sh "docker push surakshaniveus/ms-${microservice}:${env.BUILD_NUMBER}"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
    
            // Clone deployment repo
            stage('Clone deployment repository') {
                steps {
                    git branch: 'main', credentialsId: 'github', url: 'https://github.com/suraksha-niveus/CICD-argoCD.git'
                }
            }
    
            // Update image tag in deployment repo
            stage('Update GIT') {
                steps {
                    script {
                        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                            withCredentials([usernamePassword(credentialsId: 'github', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                                sh "ls -la"
                                sh "git config user.email suraksha.shetty@niveussolutions.com"
                                sh "git config user.name suraksha-niveus"
                                sh "pwd"
                                sh "cat values-dev.yaml"
                                sh "sed -i 's+tag.*+tag: ${env.BUILD_NUMBER}+g' values-dev.yaml"
                                sh "cat values-dev.yaml"
                                sh "git add ."
                                sh "git commit -m 'Done by Jenkins Job changemanifest: ${env.BUILD_NUMBER}'"
                                sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/suraksha-niveus/CICD-argoCD.git main"
                            }
                        }
                    }
                }
            }
        }
    }







// //trial

// node {
//   stage('Clone repository') {
//     checkout([
//       $class: 'GitSCM',
//       branches: [[name: 'master']],
//       userRemoteConfigs: [[credentialsId: 'github', url: 'https://github.com/suraksha-niveus/ArgoCD-multiple-microservice-src.git']]
//     ])  
//   }

//   // List of microservices
//   def microservices = ['php01', 'node01']

//   // Iterate through each microservice
//   for (int i = 0; i < microservices.size(); i++) {
//     def microservice = microservices[i]

//     // Check for changes in the microservice directory
//     def changes = scm.poll(["ArgoCD-multiple-microservice-src/${microservice}"], 1)

//     // Only build and push image if there are changes in the microservice directory
//     if (changes) {
//       stage('Build image') {
//         dir("${microservice}") {
//           def app = docker.build("surakshaniveus/ms-${microservice}")
//         }    
//       }

//       stage('Push image') {
//         docker.withRegistry('https://registry.hub.docker.com', 'docker') {
//           def app = docker.image("surakshaniveus/ms-${microservice}")
//           app.push("${env.BUILD_NUMBER}")
//         }
//       }
//     }
//   }

//   // Clone deployment repo
//   stage('Clone deployment repository') {
//     checkout([
//       $class: 'GitSCM',
//       branches: [[name: 'main']],
//       userRemoteConfigs: [[credentialsId: 'github', url: 'https://github.com/suraksha-niveus/CICD-argoCD.git']]
//     ])
//   }

//   // Update image tag in deployment repo
//   stage('Update GIT') {
//     script {
//       catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
//         withCredentials([usernamePassword(credentialsId: 'github', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
//           sh "ls -la"
//           sh "git config user.email suraksha.shetty@niveussolutions.com"
//           sh "git config user.name suraksha-niveus"
//           sh "pwd"
//           sh "cat values-dev.yaml"
//           sh "sed -i 's+tag.*+tag: ${BUILD_NUMBER}+g' values-dev.yaml"
//           sh "cat values-dev.yaml"
//           sh "git add ."
//           sh "git commit -m 'Done by Jenkins Job changemanifest: ${env.BUILD_NUMBER}'"
//           sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/suraksha-niveus/CICD-argoCD.git main"
//         }
//       }
//     }
//   }
// }

//working one/////////////////////////////////////////////////////

// def microservices = ['php01', 'node01']
// def DOCKER_REGISTRY = 'my-registry.com'

// pipeline {
//     agent any
    
//     options {
//         skipDefaultCheckout true
//     }
    
//     stages {
//         stage('Checkout') {
//             steps {
//                 git credentialsId: 'github', url: 'https://github.com/suraksha-niveus/ArgoCD-multiple-microservice-src.git'
//             }
//         }
        
//         stage('Build and push images') {
//             when {
//                 changeset "*/master"
//             }
//             steps {
//                 script {
//                     for (def microservice : microservices) {
//                         def image_name = "surakshaniveus/ms-${microservice}:${BUILD_NUMBER}"
//                         def dockerfile_path = "/path/to/${microservice}/Dockerfile"
//                         def build_args = ["MICROSERVICE=${microservice}"]
//                         def changes = git(
//                             branch: 'master', 
//                             credentialsId: 'github', 
//                             url: 'https://github.com/suraksha-niveus/ArgoCD-multiple-microservice-src.git', 
//                             changelog: true
//                         )

//                         if (changes) {
//                             def image = docker.build(image_name, "-f ${dockerfile_path} ${build_args.join(" ")} .")
//                             docker.withRegistry(DOCKER_REGISTRY, "docker") {
//                                 image.push()
//                             }
//                         }   
//                     }
//                 }
//             }
//         }
//     }
    
//     post {
//         always {
//             deleteDir()
//         }
//     }
// }


///////////////////////////////////////////////////////////////
//or

// pipeline {
//   agent any
  
//   environment {
//     DOCKER_REGISTRY = "registry.hub.docker.com"
//     GIT_REPO = "https://github.com/suraksha-niveus/CICD-argoCD.git"
//     GIT_CREDS = credentials('github')
//   }
  
//   stages {
//     stage('Clone repo') {
//       steps {
//         checkout([
//           $class: 'GitSCM',
//           branches: [[name: 'master']],
//           userRemoteConfigs: [[credentialsId: GIT_CREDS, url: 'https://github.com/suraksha-niveus/ArgoCD-multiple-microservice-src.git']]
//         ])
//       }
//     }
    
//     stage('Build and push images') {
//       steps {
//         script {
//           def microservices = ['php01', 'node01']
//           for (def microservice : microservices) {
//             def image_name = "surakshaniveus/ms-${microservice}:${BUILD_NUMBER}"
//             def dockerfile_path = "/path/to/${microservice}/Dockerfile"
//             def build_args = ["MICROSERVICE=${microservice}"]
//             def changes = scm.poll([dockerfile_path], 1)

//             if (changes) {
//               def image = docker.build(image_name, "-f ${dockerfile_path} ${build_args.join(' ')} .")
//               docker.withRegistry(DOCKER_REGISTRY, 'docker') {
//                 image.push()
//               }
//             }
//           }
//         }
//       }
//     }
    
//     stage('Update deployment repo') {
//       steps {
//         script {
//           def values_yaml = "values-dev.yaml"
//           def image_tag = "${BUILD_NUMBER}"
//           def git_creds = GIT_CREDS.usernamePassword

//           withCredentials([gitUsernamePassword(credentialsId: GIT_CREDS)]) {
//             checkout([
//               $class: 'GitSCM',
//               branches: [[name: 'main']],
//               userRemoteConfigs: [[credentialsId: GIT_CREDS, url: GIT_REPO]]
//             ])

//             sh "sed -i 's/tag:.*/tag: ${image_tag}/' ${values_yaml}"
//             sh "git add ${values_yaml}"
//             sh "git commit -m 'Update image tag to ${image_tag}'"
//             sh "git push ${git_creds}@${GIT_REPO} main"
//           }
//         }
//       }
//     }
//   }
// }












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
