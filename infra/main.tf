# Infraestructura como código de SigaWatch (Plan de GCS, sección 8).
# Declara el proyecto en Vercel y la protección de ramas en GitHub para que
# la configuración también esté versionada y se revise mediante Pull Request.
#
# Uso: terraform init && terraform plan
# Requiere las variables de entorno VERCEL_API_TOKEN y GITHUB_TOKEN.

terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 3.0"
    }
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }
}

provider "github" {
  owner = "Casallas2"
}

resource "vercel_project" "sigawatch" {
  name      = "sigawatch"
  framework = "nextjs"

  git_repository = {
    type              = "github"
    repo              = "Casallas2/sigawatch-sigatoka-uraba"
    production_branch = "main"
  }
}

resource "github_branch_protection" "main" {
  repository_id                   = "sigawatch-sigatoka-uraba"
  pattern                         = "main"
  allows_force_pushes             = false
  allows_deletions                = false
  require_conversation_resolution = true

  required_status_checks {
    strict   = true
    contexts = ["Lint y build"]
  }

  required_pull_request_reviews {
    required_approving_review_count = 1
    require_code_owner_reviews      = true
    dismiss_stale_reviews           = true
  }
}

resource "github_branch_protection" "develop" {
  repository_id       = "sigawatch-sigatoka-uraba"
  pattern             = "develop"
  allows_force_pushes = false
  allows_deletions    = false

  required_status_checks {
    strict   = true
    contexts = ["Lint y build"]
  }
}
