# AngularMiniProjet

## Aperçu
Ce projet est une combinaison d'Angular (frontend) et de Spring Boot (backend), fournissant un système d'authentification complet. Les tâches liées à l'authentification des utilisateurs se trouvent dans le dossier 'auth'.

## Fonctionnalités
- Création de compte avec vérification par e-mail et activation.
- Réinitialisation du mot de passe avec notification par e-mail.
- Authentification basée sur JWT sécurisant les points d'accès du backend.
- Utilisation des méthodes HTTP (GET, POST, PUT, DELETE, PATCH).

## Structure du Projet
- Frontend Angular : [AngularMiniProjet](https://github.com/samibentaarit/AngularMiniProjet) (version Angular 15)
- Backend Spring Boot : [tp-foyer-samibentaarit](https://github.com/Esprit-UP-ASI/tp-foyer-samibentaarit/tree/projet_springboot_angular/src/main/java/com/example/projet/Auth)

## Démo
Consultez le déroulement de l'application dans cette [vidéo YouTube](https://youtu.be/xobAzV50u2c).

## Comment Tester le Projet
1. Clonez le projet frontend :
    ```bash
    git clone -b integrationtasli7 https://github.com/samibentaarit/AngularMiniProjet.git
    cd AngularMiniProjet
    npm install
    ng serve -o
    ```

2. Clonez le projet backend :
    ```bash
    git clone -b projet_springboot_angular https://github.com/Esprit-UP-ASI/tp-foyer-samibentaarit.git
    ```

3. Installez XAMPP.

4. Lancez les serveurs de l'application :
    - Backend (IntelliJ IDEA) : Démarrez le serveur.
    - Frontend (Angular) : Exécutez `ng serve -o`.

## Notes Supplémentaires
N'hésitez pas à explorer et à modifier le code selon vos besoins. Si vous avez des questions ou avez besoin d'aide, n'hésitez pas à me contacter.

Bon codage ! :D
