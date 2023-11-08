#!/bin/bash

# Start Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install required packages
pip install Flask flask_cors

# Run Python server
python3 app.py
