import environ
from django.http import HttpResponseRedirect, HttpResponse
from groq import Groq
from django.views.decorators.csrf import csrf_protect
import os

env = environ.Env()
environ.Env.read_env()

GROQ_API_KEY = os.environ.get('GROQ_API_KEY')

@csrf_protect
def openai_chat_request(request):
    prompt = request.GET.get('prompt')

    client = Groq(
        api_key=GROQ_API_KEY
    )

    response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="llama-3.3-70b-versatile",
    )

    print("call: ", response.choices[0].message.content)

    data = response.choices[0].message.content

    return HttpResponse(data)