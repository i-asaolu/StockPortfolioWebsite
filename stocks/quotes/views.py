from django.shortcuts import render, redirect
from .models import Stock
from .forms import StockForm
from django.contrib import messages
import requests
import json

# Replace 'public_key' with your Alpha Vantage API key
public_key = 'MDWZ9JK2CGH7DOC2'

def home(request):
    if request.method == 'POST':
        ticker = request.POST['ticker']
        api_request = requests.get(f"https://www.alphavantage.co/query?function=OVERVIEW&symbol={ticker}&apikey={public_key}")
        try:
            api = json.loads(api_request.content)
            if not api:
                api = "Error: No data found for the given ticker symbol."
            else:
                api = {k.lower(): v for k, v in api.items()}
        except Exception as e:
            api = "Error: An error occurred while fetching data."
        return render(request, 'home.html', {'api': api})
    else:
        return render(request, 'home.html', {'ticker': "Enter a ticker symbol above..."})

def about(request):
    return render(request, 'about.html', {})

def add_stock(request):
    if request.method == 'POST':
        form = StockForm(request.POST or None)
        if form.is_valid():
            form.save()
            messages.success(request, "Stock Has Been Added")
            return redirect('add_stock')
    else:
        ticker = Stock.objects.all()
        return render(request, 'add_stock.html', {'ticker': ticker})

def delete(request, stock_id):
    item = Stock.objects.get(pk=stock_id)
    item.delete()
    messages.success(request, "Stock Has Been Deleted!")
    return redirect('add_stock')
