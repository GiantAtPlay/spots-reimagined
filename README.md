# Spots Reimagined
A personal Magic: The Gathering collection tracker built as a single-container Docker web application. Track your cards, manage locations, monitor collection progress, and sync card data from Scryfall.

## Features
- **User system**:  
- **Dashboard**: Collections overview and statistics
- **Collection management**: Track owned cards, mark things for trade and create a wishlist
- **Trackers**: Track completion progress for sets or curated lists of cards
- **Spots**: Manage how and where you store your cards
- **Settings**: Customise app behaviour and default display settings


## Tech stack

| Component | Technology |
|-----------|------------|
| Backend | ASP.NET Core 8 |
| Frontend | VueJS + TypeScript |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| Database | SQLite |
| ORM | Entity Framework Core 8 |
| Card Data API | Scryfall API |


## Project structure
```
Spots/
├── Dockerfile               # Multi-stage Docker build
├── docker-compose.yml       # Docker Compose configuration
├── Spots.sln                # Solution file
├── docs/
│   ├── protoypes/           # Example code to help development
│   ├── specs/               # Detailed specification files
└── src/
    ├── Spots.Api/           # ASP.NET Core backend
    │   ├── Feature/         # All code related to a feature
    │   ├── Data/           
    │   │   ├── Models/      # Entity models
    │   │   ├── Repositories # Data access code
    │   │   ├── DbContext    # EF Core DbContext
    │   ├── Domain/          # Data transfer objects
    │   │   ├── Models/      # App models
    │   │   ├── Enums/       # App enums
    │   └── Shared/          # Share code and business logic
    ├── Spots.App/           # Vue frontend
    │   ├── src/
    │   │   ├── api/         # API client
    │   │   ├── components/  # Reusable UI components
    │   │   ├── pages/       # Page components
    │   │   └── types/       # TypeScript types
    │   ├── tests/           # UI unit tests
    │   └── package.json
    └── Spots.Tests/         # Dotnet unit tests
```


## Feature structure
```
feature/
├── Models/             
│   ├── RequestModel.cs  # Model expected by api
│   ├── ResponseModel.cs # Model returned from api
├── Controller.cs        # API entry point
├── Service.cs           # Business logic
├── README.md            # Document explaining the feature
```
