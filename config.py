import os


basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    template_folder=os.environ.get("FLASK_TEMPLATE_FOLDER"),
    static_folder=os.environ.get("FLASK_STATIC_FOLDER"),
    static_url_path="/assets"

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False