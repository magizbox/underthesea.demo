#!/usr/bin/env bash
git pull origin beta
pip uninstall -y underthesea; pip install git+https://github.com/magizbox/underthesea.git@beta
underthesea data
python manage.py runserver 0.0.0.0:9001