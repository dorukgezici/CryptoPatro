from django.views.generic import TemplateView


class PortfolioView(TemplateView):
    template_name = 'index.html'
