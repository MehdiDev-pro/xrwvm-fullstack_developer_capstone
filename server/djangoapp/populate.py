from .models import CarMake, CarModel


def initiate():
    car_make_data = [
        {"name": "NISSAN", "description": "Great cars. Japanese technology"},
        {"name": "Mercedes", "description": "Great cars. German technology"},
        {"name": "Audi", "description": "Great cars. German technology"},
        {"name": "Kia", "description": "Great cars. Korean technology"},
        {"name": "Toyota", "description": "Great cars. Japanese technology"},
    ]

    car_mi = []
    for data in car_make_data:
        name = data['name']
        desc = data['description']
        car_make_obj = CarMake.objects.create(name=name, description=desc)
        car_mi.append(car_make_obj)

    # Create CarModel instances with the corresponding CarMake instances
    car_model_data = [
      {
        "name": "Pathfinder",
        "type": "SUV",
        "year": 2023,
        "car_make": car_mi[0],
      },
      {"name": "Qashqai", "type": "SUV", "year": 2023, "car_make": car_mi[0]},
      {"name": "XTRAIL", "type": "SUV", "year": 2023, "car_make": car_mi[0]},
      {"name": "A-Class", "type": "SUV", "year": 2023, "car_make": car_mi[1]},
      {"name": "C-Class", "type": "SUV", "year": 2023, "car_make": car_mi[1]},
      {"name": "E-Class", "type": "SUV", "year": 2023, "car_make": car_mi[1]},
      {"name": "A4", "type": "SUV", "year": 2023, "car_make": car_mi[2]},
      {"name": "A5", "type": "SUV", "year": 2023, "car_make": car_mi[2]},
      {"name": "A6", "type": "SUV", "year": 2023, "car_make": car_mi[2]},
      {"name": "Sorrento", "type": "SUV", "year": 2023, "car_make": car_mi[3]},
      {"name": "Carnival", "type": "SUV", "year": 2023, "car_make": car_mi[3]},
      {"name": "Cerato", "type": "Sedan", "year": 2023, "car_make": car_mi[3]},
      {
        "name": "Corolla",
        "type": "Sedan",
        "year": 2023,
        "car_make": car_mi[4],
      },
      {"name": "Camry", "type": "Sedan", "year": 2023, "car_make": car_mi[4]},
      {"name": "Kluger", "type": "SUV", "year": 2023, "car_make": car_mi[4]},
    ]

    for data in car_model_data:
        CarModel.objects.create(
            name=data['name'],
            car_make=data['car_make'],
            type=data['type'],
            year=data['year'],
        )
