# Guide de Contribution

Ce guide vous aidera à contribuer au développement d'Agora 2.0.

## Standards de code

### 1. Style de code

#### PHP
- Suivre les [PSR-12](https://www.php-fig.org/psr/psr-12/)
- Utiliser des types stricts
- Documenter le code avec PHPDoc

```php
/**
 * Description de la fonction
 *
 * @param string $param1 Description du paramètre
 * @param int $param2 Description du paramètre
 * @return bool Description de la valeur de retour
 */
function exampleFunction(string $param1, int $param2): bool
{
    // Code ici
}
```

#### JavaScript
- Suivre le [Standard JavaScript](https://standardjs.com/)
- Utiliser ES6+
- Documenter avec JSDoc

```javascript
/**
 * Description de la fonction
 * @param {string} param1 - Description du paramètre
 * @param {number} param2 - Description du paramètre
 * @returns {boolean} Description de la valeur de retour
 */
function exampleFunction(param1, param2) {
    // Code ici
}
```

#### CSS
- Suivre [BEM](http://getbem.com/)
- Utiliser des variables CSS
- Organiser par composants

```css
.block {
    /* Styles du bloc */
}

.block__element {
    /* Styles de l'élément */
}

.block--modifier {
    /* Styles du modificateur */
}
```

### 2. Git Workflow

#### Branches
- `main` : Branche principale (production)
- `develop` : Branche de développement
- `feature/*` : Nouvelles fonctionnalités
- `bugfix/*` : Corrections de bugs
- `hotfix/*` : Corrections urgentes

#### Commits
Format : `type(scope): description`

Types :
- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `docs` : Documentation
- `style` : Formatage
- `refactor` : Refactorisation
- `test` : Tests
- `chore` : Maintenance

Exemple :
```bash
git commit -m "feat(auth): ajout de l'authentification à deux facteurs"
```

## Processus de contribution

### 1. Préparation

1. Fork le projet
2. Clone votre fork
3. Créez une branche
```bash
git checkout -b feature/nouvelle-fonctionnalite
```

### 2. Développement

1. Écrivez du code
2. Ajoutez des tests
3. Documentez les changements
4. Vérifiez les standards
```bash
# Vérification PHP
php-cs-fixer fix

# Vérification JavaScript
standard --fix

# Vérification CSS
stylelint --fix
```

### 3. Tests

1. Exécutez les tests unitaires
```bash
phpunit
```

2. Vérifiez la couverture
```bash
phpunit --coverage-html coverage
```

3. Testez manuellement

### 4. Soumission

1. Commit vos changements
```bash
git add .
git commit -m "type(scope): description"
```

2. Push vers votre fork
```bash
git push origin feature/nouvelle-fonctionnalite
```

3. Créez une Pull Request

## Revue de code

### 1. Critères d'acceptation

- Code conforme aux standards
- Tests passants
- Documentation à jour
- Pas de conflits
- Description claire

### 2. Processus de revue

1. Assignation des reviewers
2. Revue du code
3. Commentaires et suggestions
4. Corrections si nécessaire
5. Approbation et merge

## Documentation

### 1. Documentation du code

- Utiliser PHPDoc/JSDoc
- Expliquer les choix techniques
- Documenter les APIs

### 2. Documentation utilisateur

- Mettre à jour le README
- Ajouter des exemples
- Documenter les changements

## Outils recommandés

### 1. Éditeurs
- VS Code
- PHPStorm
- Sublime Text

### 2. Extensions
- PHP CS Fixer
- ESLint
- Stylelint
- GitLens

### 3. Outils de test
- PHPUnit
- Jest
- BrowserStack

## Support

Si vous avez des questions :
1. Consultez les [issues](https://github.com/NeuTroNBZh/Agora2.0/issues)
2. Rejoignez notre [Discord](https://discord.gg/uqDBpmRE3m)
3. Contactez les mainteneurs

## Prochaines étapes

1. [Développement](developpement.md)
2. [Tests](tests.md)
3. [Documentation](documentation.md)

---

<div align="center">
  <sub>Dernière mise à jour : 24/04/2025</sub>
</div> 