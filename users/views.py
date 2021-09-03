from django.views.generic import TemplateView


class UsersView(TemplateView):
    template_name = 'index.html'
