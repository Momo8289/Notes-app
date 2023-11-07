from app.api import bp


@bp.route("/")
def root():
    return "API route working"