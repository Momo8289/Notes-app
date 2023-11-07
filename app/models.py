from sqlalchemy.sql import func

from app import db


class Note(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    title = db.Column(db.String(256), index=True)
    body = db.Column(db.String, index=True)
    created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    
    def __repr__(self) -> str:
        return f"<Note '{self.title}'>"