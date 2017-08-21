from os.path import join

from django.shortcuts import render


def index(request):
    # return HttpResponse('Hello from Python!')
    return render(request, 'index.html')