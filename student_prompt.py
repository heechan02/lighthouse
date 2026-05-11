from openai import AzureOpenAI
import sys
import json

# environment
endpoint = "https://app-uoaihack6zs3w.azurewebsites.net"
api_version = "2024-12-01-preview"
model_name = "gpt-5.4"

system_prompt: str = "You are a helpful careers service assistant."
"Your only job is to provide assistance for BAME students searching for scholarships and other careers opportunities."
"You will be given the academic and personal profile of the student seeking advice in a .json format, which you should use to personalise your outputs."
"You must start every conversation with greeting the student by the first name in their .json profile."
"You must not answer queries unrelated to careers assistance. Any other queries related to the university should be redirected to the relevant Loughborough University webpage.\n"

def prompt(API_KEY: str, student_profile: str, prompt_in: list) -> list:
    """
    Prompts Azure OpenAI, tailoring the response to the student profile given.

    args:
        API_KEY (str):          command-line argument
        student_profile (str):  string dump of student .json file
        prompt_in (list):       prompt and conversation history
    """
    response = client.chat.completions.create(
        messages= prompt_in,
        max_completion_tokens=16384,
        model="gpt-5.4"
    )
    print(response.choices[0].message.content)

    # add to output
    out = prompt_in
    out.append(
        {
            "role": "assistant",
            "content": response.choices[0].message.content
        }
    )
    return out

def main(API_KEY):
    global client
    client = AzureOpenAI(api_version=api_version, azure_endpoint=endpoint, api_key=API_KEY)

    # dummy student profile
    with open("F123456.json", "r") as json_file:
        student_data = json.load(json_file)
    content = json.dumps(student_data)

    message_hist = [
        {
            "role": "system",
            "content": system_prompt + content
        }
    ]

    for i in range(5):
        inp = input("Q: ")
        if inp == "q": break
        message_hist.append({
            "role": "user",
            "content": inp
        })
        message_hist = prompt(API_KEY, content, message_hist)

main(sys.argv[1:][0])